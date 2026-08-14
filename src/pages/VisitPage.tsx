export default function VisitPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>参观服务</h1>
        <p>开放时间、预约方式、交通与展厅分布（演示数据，请以官方公告为准）。</p>
      </div>

      <div className="visit-grid">
        <div className="visit-card">
          <h3>🕘 开放时间</h3>
          <ul>
            <li>周二至周日：09:00 - 17:00</li>
            <li>16:00 停止入馆</li>
            <li>周一闭馆（法定节假日除外）</li>
            <li>暑期夜游：周五、周六延时至 20:30</li>
          </ul>
        </div>

        <div className="visit-card">
          <h3>🎫 预约方式</h3>
          <ul>
            <li>官方微信公众号：宜昌博物馆</li>
            <li>数字文博平台在线预约</li>
            <li>凭身份证或预约二维码入馆</li>
            <li>团队参观请提前 3 个工作日预约</li>
          </ul>
        </div>

        <div className="visit-card">
          <h3>🚌 地址交通</h3>
          <ul>
            <li>地址：宜昌市伍家岗区柏临河路（规划展览馆旁）</li>
            <li>公交：B1 / B9 / B37 路博物馆站</li>
            <li>自驾：馆区东侧设有停车场</li>
          </ul>
        </div>

        <div className="visit-card">
          <h3>🗺️ 楼层导览</h3>
          <ul>
            <li>一楼：巴楚文明厅、临展厅、服务台</li>
            <li>二楼：三峡文化厅、远古厅（长阳人）</li>
            <li>三楼：非遗展厅、研学教室</li>
            <li>四楼：专题厅、学术报告厅</li>
          </ul>
        </div>

        <div className="visit-card">
          <h3>📋 参观须知</h3>
          <ul>
            <li>馆内请勿使用闪光灯拍摄</li>
            <li>禁止携带宠物与危险物品入馆</li>
            <li>展厅内请勿饮食、奔跑</li>
            <li>无障碍设施齐全，可租借轮椅与婴儿车</li>
          </ul>
        </div>

        <div className="visit-card">
          <h3>🤝 社教活动</h3>
          <ul>
            <li>每月一期“小小讲解员”培训</li>
            <li>周末亲子考古体验工坊</li>
            <li>“文博进校园”巡回课堂</li>
            <li>志愿者常年招募中</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
