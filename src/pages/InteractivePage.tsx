import { useState } from 'react';

/**
 * 互动展品（组合自 pengan1987/computer-museum-dnbwg 的“在线可玩展品”思路）：
 * 展品不只是图片，而是可以互动体验的数字内容。
 */

const bells = [
  { name: '宫', label: 'Do', freq: 261.63, size: 96 },
  { name: '商', label: 'Re', freq: 293.66, size: 104 },
  { name: '角', label: 'Mi', freq: 329.63, size: 112 },
  { name: '徵', label: 'Sol', freq: 392.0, size: 122 },
  { name: '羽', label: 'La', freq: 440.0, size: 132 },
  { name: '宫高', label: 'Do+', freq: 523.25, size: 88 },
  { name: '商高', label: 'Re+', freq: 587.33, size: 96 },
  { name: '角高', label: 'Mi+', freq: 659.25, size: 104 },
];

let audioCtx: AudioContext | null = null;

/**
 * 编钟音色合成：
 * 浏览器自动播放策略会挂起 AudioContext，首次点击时创建并 resume；
 * 使用钟体泛音列（基音 + 2.0x + 2.76x + 5.4x）叠加，音色更接近真实的钟声。
 */
async function playBell(freq: number): Promise<boolean> {
  try {
    audioCtx = audioCtx ?? new AudioContext();
    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }
    const now = audioCtx.currentTime;

    const master = audioCtx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.5, now + 0.02);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
    master.connect(audioCtx.destination);

    const partials: Array<[number, number]> = [
      [1, 1],
      [2.0, 0.45],
      [2.76, 0.3],
      [5.4, 0.12],
    ];
    for (const [ratio, amp] of partials) {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq * ratio;
      const gain = audioCtx.createGain();
      gain.gain.value = amp;
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      osc.stop(now + 2.9);
    }
    return true;
  } catch (err) {
    console.error('WebAudio 播放失败:', err);
    return false;
  }
}

const quiz = [
  {
    q: '宜昌博物馆的镇馆之宝“虎钮錞于”属于哪个古代民族？',
    options: ['巴人', '楚人', '蜀人', '吴人'],
    answer: 0,
  },
  {
    q: '“长阳人”化石距今约多少年？',
    options: ['1 万年', '5 万年', '19 万年', '100 万年'],
    answer: 2,
  },
  {
    q: '錞于是古代在什么场合使用的乐器？',
    options: ['宫廷宴乐', '军旅号令', '婚丧嫁娶', '田间劳作'],
    answer: 1,
  },
  {
    q: '楚式漆器最常见的配色是？',
    options: ['红与黑', '黄与蓝', '白与绿', '金与紫'],
    answer: 0,
  },
  {
    q: '宜昌地处长江中游，古称？',
    options: ['夷陵', '江陵', '荆门', '当阳'],
    answer: 0,
  },
];

export default function InteractivePage() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);
  const [audioError, setAudioError] = useState('');

  const hit = async (name: string, label: string, freq: number) => {
    const ok = await playBell(freq);
    if (ok) {
      setLastPlayed(`${name}（${label}）`);
      setAudioError('');
    } else {
      setAudioError('浏览器未允许播放声音：请检查浏览器声音权限，或点击页面后再试。');
    }
  };

  const score = quiz.reduce(
    (acc, item, i) => acc + (answers[i] === item.answer ? 1 : 0),
    0,
  );

  const choose = (qi: number, oi: number) => {
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
    setSubmitted(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>互动体验</h1>
        <p>
          参考电脑博物馆（computer-museum）的“在线可玩展品”思路：让文物可听、可玩、可考。
        </p>
      </div>

      <div className="interactive-grid">
        <div className="interactive-card">
          <h2>🎐 编钟演奏</h2>
          <p className="sub">点击编钟，奏响楚地五声音阶（宫商角徵羽）</p>
          <div className="bells">
            {bells.map((b) => (
              <button
                key={b.name}
                className="bell"
                style={{ width: b.size, height: b.size * 1.3 }}
                onClick={() => hit(b.name, b.label, b.freq)}
                title={`${b.name} · ${b.label}`}
              >
                <span>{b.name}</span>
                <small>{b.label}</small>
              </button>
            ))}
          </div>
          {lastPlayed && <p className="now-playing">🔔 正在演奏：{lastPlayed}</p>}
          {audioError && <p className="audio-error">{audioError}</p>}
          <p style={{ color: 'var(--text-dim)', fontSize: 13, margin: 0 }}>
            音高为演示数据，真实编钟按出土测音数据配置即可。若首次点击无声，请再点一次（浏览器
            首次需要授予声音权限）。
          </p>
        </div>

        <div className="interactive-card">
          <h2>📜 文物知识闯关</h2>
          <p className="sub">5 道题，测测你对宜昌博物馆的了解</p>
          <div className="quiz-block">
            {quiz.map((item, qi) => (
              <div className="quiz-q" key={item.q}>
                <h4>
                  {qi + 1}. {item.q}
                </h4>
                {item.options.map((opt, oi) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name={`q${qi}`}
                      checked={answers[qi] === oi}
                      onChange={() => choose(qi, oi)}
                    />
                    {'  '}
                    {opt}
                  </label>
                ))}
                {submitted && (
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-dim)' }}>
                    {answers[qi] === item.answer
                      ? '✅ 回答正确'
                      : `❌ 正确答案：${item.options[item.answer]}`}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button
            className="btn solid"
            onClick={() => setSubmitted(true)}
            disabled={answers.length < quiz.length}
          >
            提交答卷
          </button>
          {submitted && (
            <p className="quiz-result">
              你的得分：<span className="score">{score}</span> / {quiz.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
