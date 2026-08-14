import * as THREE from 'three';
import type { Artifact } from '../data/collection';

export interface MuseumHallOptions {
  container: HTMLElement;
  artifacts: Artifact[];
  onSelect: (artifact: Artifact) => void;
  onStatus?: (message: string) => void;
}

interface SaveSlot {
  position: THREE.Vector3;
  yaw: number;
  pitch: number;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * 3D 数字展厅
 * - 第一人称漫游、点击展品交互：参考 Steve245270533/gallery（Raycaster + 高亮交互）
 * - 自由相机、视角存档/读取、自动环绕：参考 magcius/noclip.website
 * 场景资产流程（gallery 同款）：Blender 建模 → 烘焙贴图 → 导出 glb；
 * 本 Demo 用 three.js 原生几何体 + Canvas 贴图代替，替换为 glb 模型即可。
 */
export class MuseumHall {
  private container: HTMLElement;
  private artifacts: Artifact[];
  private onSelect: (artifact: Artifact) => void;
  private onStatus?: (message: string) => void;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();

  private keys = new Set<string>();
  private yaw = 0;
  private pitch = -0.08;
  private position = new THREE.Vector3(0, 2.4, 9);
  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  private moved = false;
  private autoOrbit = false;
  private savestates: Array<SaveSlot | null> = Array.from({ length: 9 }, () => null);
  private exhibitMeshes: Array<{ mesh: THREE.Object3D; artifact: Artifact }> = [];
  private clock = new THREE.Clock();
  private rafId = 0;
  private disposed = false;

  private boundKeyDown = (e: KeyboardEvent) => this.onKeyDown(e);
  private boundKeyUp = (e: KeyboardEvent) => this.keys.delete(e.code);
  private boundMouseDown = (e: MouseEvent) => this.onMouseDown(e);
  private boundMouseMove = (e: MouseEvent) => this.onMouseMove(e);
  private boundMouseUp = () => {
    this.dragging = false;
  };
  private boundClick = (e: MouseEvent) => this.onClick(e);
  private boundResize = () => this.onResize();

  constructor(options: MuseumHallOptions) {
    this.container = options.container;
    this.artifacts = options.artifacts;
    this.onSelect = options.onSelect;
    this.onStatus = options.onStatus;
  }

  init() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c0a10);
    this.scene.fog = new THREE.Fog(0x0c0a10, 20, 46);

    this.camera = new THREE.PerspectiveCamera(72, width / height, 0.1, 100);
    this.camera.position.copy(this.position);

    this.buildLights();
    this.buildRoom();
    this.buildExhibits();

    window.addEventListener('keydown', this.boundKeyDown);
    window.addEventListener('keyup', this.boundKeyUp);
    window.addEventListener('resize', this.boundResize);
    const el = this.renderer.domElement;
    el.addEventListener('mousedown', this.boundMouseDown);
    window.addEventListener('mousemove', this.boundMouseMove);
    window.addEventListener('mouseup', this.boundMouseUp);
    el.addEventListener('click', this.boundClick);

    this.animate();
  }

  resetView() {
    this.position.set(0, 2.4, 9);
    this.yaw = 0;
    this.pitch = -0.08;
    this.autoOrbit = false;
    this.onStatus?.('视角已重置');
  }

  toggleAutoOrbit() {
    this.autoOrbit = !this.autoOrbit;
    this.onStatus?.(this.autoOrbit ? '自动环绕：开' : '自动环绕：关');
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('keydown', this.boundKeyDown);
    window.removeEventListener('keyup', this.boundKeyUp);
    window.removeEventListener('resize', this.boundResize);
    const el = this.renderer.domElement;
    el.removeEventListener('mousedown', this.boundMouseDown);
    window.removeEventListener('mousemove', this.boundMouseMove);
    window.removeEventListener('mouseup', this.boundMouseUp);
    el.removeEventListener('click', this.boundClick);
    this.renderer.dispose();
    if (el.parentElement === this.container) {
      this.container.removeChild(el);
    }
  }

  private buildLights() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const key = new THREE.DirectionalLight(0xfff4e0, 1.2);
    key.position.set(6, 12, 8);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 42;
    key.shadow.camera.left = -16;
    key.shadow.camera.right = 16;
    key.shadow.camera.top = 16;
    key.shadow.camera.bottom = -16;
    this.scene.add(key);
  }

  private buildRoom() {
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 1024;
    floorCanvas.height = 1024;
    const ctx = floorCanvas.getContext('2d')!;
    ctx.fillStyle = '#191418';
    ctx.fillRect(0, 0, 1024, 1024);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.22)';
    ctx.lineWidth = 5;
    const step = 128;
    for (let i = 0; i <= 1024; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1024);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    const floorTex = new THREE.CanvasTexture(floorCanvas);
    floorTex.wrapS = THREE.RepeatWrapping;
    floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(6, 6);
    floorTex.colorSpace = THREE.SRGBColorSpace;

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.85, metalness: 0.12 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0x2a232c, roughness: 0.9 });
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x141018, roughness: 0.7 });
    const wallH = 6;

    const north = new THREE.Mesh(new THREE.PlaneGeometry(30, wallH), wallMat);
    north.position.set(0, wallH / 2, -14.4);
    this.scene.add(north);

    const south = new THREE.Mesh(new THREE.PlaneGeometry(30, wallH), wallMat);
    south.position.set(0, wallH / 2, 14.4);
    south.rotation.y = Math.PI;
    this.scene.add(south);

    const east = new THREE.Mesh(new THREE.PlaneGeometry(30, wallH), wallMat);
    east.position.set(14.4, wallH / 2, 0);
    east.rotation.y = -Math.PI / 2;
    this.scene.add(east);

    const west = new THREE.Mesh(new THREE.PlaneGeometry(30, wallH), wallMat);
    west.position.set(-14.4, wallH / 2, 0);
    west.rotation.y = Math.PI / 2;
    this.scene.add(west);

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), panelMat);
    ceiling.position.set(0, wallH, 0);
    ceiling.rotation.x = Math.PI / 2;
    this.scene.add(ceiling);
  }

  private makePlaqueTexture(title: string): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#151017';
    ctx.fillRect(0, 0, 512, 128);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, 496, 112);
    ctx.fillStyle = '#e8d9b0';
    ctx.font = 'bold 42px "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, 256, 64);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  private buildExhibits() {
    const loader = new THREE.TextureLoader();
    const layout: Array<{ pos: [number, number, number]; rotY: number }> = [
      { pos: [-7, 3.3, -13.6], rotY: 0 },
      { pos: [0, 3.3, -13.6], rotY: 0 },
      { pos: [7, 3.3, -13.6], rotY: 0 },
      { pos: [-5, 3.3, 13.6], rotY: Math.PI },
      { pos: [5, 3.3, 13.6], rotY: Math.PI },
      { pos: [13.6, 3.3, 0], rotY: -Math.PI / 2 },
    ];

    this.artifacts.forEach((artifact, i) => {
      const group = new THREE.Group();

      const texture = loader.load(artifact.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      const board = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 2.6),
        new THREE.MeshStandardMaterial({ map: texture, roughness: 0.65, metalness: 0.05 }),
      );

      const frameMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.75,
        roughness: 0.32,
      });
      const frame = new THREE.Mesh(new THREE.BoxGeometry(3.95, 2.95, 0.16), frameMat);
      frame.position.z = -0.08;

      const plaque = new THREE.Mesh(
        new THREE.PlaneGeometry(2.8, 0.7),
        new THREE.MeshStandardMaterial({ map: this.makePlaqueTexture(artifact.title) }),
      );
      plaque.position.set(0, -1.78, 0.02);

      const spot = new THREE.SpotLight(0xffe8c0, 50, 9, Math.PI / 5, 0.6, 1);
      spot.position.set(0, 2.5, 1.6);
      const spotTarget = new THREE.Object3D();
      spotTarget.position.set(0, -0.4, 0);
      spot.target = spotTarget;

      group.add(board, frame, plaque, spot, spotTarget);
      group.position.set(...layout[i].pos);
      group.rotation.y = layout[i].rotY;
      this.scene.add(group);

      this.exhibitMeshes.push({ mesh: board, artifact });
    });
  }

  private onKeyDown(e: KeyboardEvent) {
    this.keys.add(e.code);

    if (e.code === 'KeyR') {
      this.toggleAutoOrbit();
    }

    const digitMap: Record<string, number> = {
      Digit1: 1,
      Digit2: 2,
      Digit3: 3,
      Digit4: 4,
      Digit5: 5,
      Digit6: 6,
      Digit7: 7,
      Digit8: 8,
      Digit9: 9,
    };
    const slot = digitMap[e.code];
    if (slot) {
      if (e.shiftKey) {
        this.savestates[slot - 1] = {
          position: this.position.clone(),
          yaw: this.yaw,
          pitch: this.pitch,
        };
        this.onStatus?.(`已保存视角 ${slot}（Shift+${slot}）`);
      } else if (this.savestates[slot - 1]) {
        const s = this.savestates[slot - 1]!;
        this.position.copy(s.position);
        this.yaw = s.yaw;
        this.pitch = s.pitch;
        this.onStatus?.(`已读取视角 ${slot}`);
      }
    }
  }

  private onMouseDown(e: MouseEvent) {
    if (e.button !== 0) return;
    this.dragging = true;
    this.moved = false;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  private onMouseMove(e: MouseEvent) {
    if (!this.dragging) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    if (Math.abs(dx) + Math.abs(dy) > 3) this.moved = true;
    this.yaw -= dx * 0.004;
    this.pitch = clamp(this.pitch - dy * 0.004, -1.35, 1.35);
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  private onClick(e: MouseEvent) {
    if (this.moved) {
      this.moved = false;
      return;
    }
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const meshes = this.exhibitMeshes.map((m) => m.mesh);
    const hits = this.raycaster.intersectObjects(meshes, false);
    if (hits.length > 0) {
      const entry = this.exhibitMeshes.find((m) => m.mesh === hits[0].object);
      if (entry) this.onSelect(entry.artifact);
    }
  }

  private onResize() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private update(dt: number) {
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    const dir = new THREE.Vector3();

    if (this.keys.has('KeyW')) dir.add(forward);
    if (this.keys.has('KeyS')) dir.sub(forward);
    if (this.keys.has('KeyA')) dir.sub(right);
    if (this.keys.has('KeyD')) dir.add(right);
    if (dir.lengthSq() > 0) dir.normalize();

    const speed =
      this.keys.has('ShiftLeft') || this.keys.has('ShiftRight') ? 9 : 4.5;
    this.position.addScaledVector(dir, speed * dt);
    if (this.keys.has('Space')) this.position.y += 5 * dt;
    if (this.keys.has('KeyC')) this.position.y -= 5 * dt;

    this.position.x = clamp(this.position.x, -13.2, 13.2);
    this.position.z = clamp(this.position.z, -13.2, 13.2);
    this.position.y = clamp(this.position.y, 1.1, 5.2);

    if (this.autoOrbit) this.yaw += dt * 0.25;

    this.camera.position.copy(this.position);
    this.camera.quaternion.setFromEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));
  }

  private animate = () => {
    if (this.disposed) return;
    this.rafId = requestAnimationFrame(this.animate);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.update(dt);
    this.renderer.render(this.scene, this.camera);
  };
}
