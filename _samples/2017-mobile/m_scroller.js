
/**
 *  SimulatedScroller start
 模拟滚动 实现原理：
- scroller-container 设置 css `overflow: hidden;` 以及固定的高度来禁止浏览器原生滚动, scroller 是内容区。
- scroller-container 设置 touchstart 事件和 touchmove/touchend 事件(后两者也可以在 document 绑定)。
- 在 touchstart 事件里记录一次滚动初始的 e.pageY 位置值
    - 同时在遇到 /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ 这些元素时，return 掉 不需要处理。
- 在 touchmove 事件里获取 e.pageY 减去在 touchstart 事件里获取到 e.pageY ，以此值设置 scroller 的“卷积高度值”
    - 如果 scroller 设置 css `position: absolute;` 则“卷积高度值”设在 style.top 上（不建议）；
    - 如果 scroller 设置 css `transform: translate3d(x, y, z);` 则“卷积高度值”设在 y 上。
- 在 touchend 事件里设置 momentum(动量) 值，并用“缓动公式”产生物理运动的“动画效果”
    - 如果 touchmove 的事件执行事件比较长(即用户在上下“拖拽着”页面)，则不需要设置 momentum ，
    - 否则设置 momentum 并产生动画效果，达到模拟浏览器原生滚动的目的
- 体验增强：生成模拟的滚动条
 */
function simulatedScroller(container, scroller) {
  const logEle = document.querySelector('#log');
  function log(c) {
    logEle.innerHTML = c;
  }

  const rException = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
  const rAF = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

  function _event(e) {
    if (e.touches && e.touches.length) {
      return e.touches[0];
    }
    if (e.changedTouches && e.changedTouches.length) {
      return e.changedTouches[0];
    }
    return e;
  }

  function momentum(current, start, time, deceleration) {
    const distance = current - start;
    const speed = Math.abs(distance) / time;
    const d = deceleration === undefined ? 0.0006 : deceleration;

    const destination = current + (speed * speed) / (2 * d) * (distance < 0 ? -1 : 1);
    const duration = speed / d;

    return {
      destination: Math.round(destination),
      duration,
    };
  }

  container.addEventListener('touchstart', start);
  container.addEventListener('touchmove', move);
  container.addEventListener('touchend', end);

  let _lastEl;
  let _pageY;
  let _startY;
  let _lastY = 0;
  let _distY;
  let _startTime;
  let _endTime;
  let _isAnimating;

  let reachTop = false;
  let reachBottom = false;

  function start(e) {
    const target = e.target;
    if (rException.test(target.tagName)) {
      return;
    }
    log('touch start');
    // console.log(e, _event(e));
    _startTime = Date.now();
    const _e = _event(e);
    _lastEl = _e.target;
    _pageY = _e.pageY;
    _startY = _lastY;
    _distY = 0;

    if (_isAnimating) {
      _isAnimating = false;
      _translate(_startY);
    }

    // can not preventDefault, because the body maybe scroll
    // e.preventDefault();
  }

  function move(e) {
    if (!_lastEl) {
      return;
    }
    const _e = _event(e);
    const _diff = Math.round(_e.pageY - _pageY);

    _pageY = _e.pageY;
    _distY += _diff;
    _lastY += _diff;

    // log(`${_e.pageY} ${_pageY} ${_lastY} ${_diff}`);
    _translate(_lastY);

    // 滚动到 顶部/底部 后再继续滚动，不应该再 preventDefault
    if (!(reachTop && _diff > 0 || reachBottom && _diff < 0)) {
      console.log('not reach top/bottom');
      e.preventDefault();
    }
  }

  function end(e) {
    if (!_lastEl) {
      return;
    }
    _lastEl = null;
    // Maybe for normal click offset of the content
    if (Math.abs(_distY) < 10) {
      return;
    }
    _endTime = Date.now();
    let _duration = _endTime - _startTime;
    if (_duration < 300) {
      const _momentum = momentum(_lastY, _startY, _duration);

      if (Math.abs(_momentum.destination) > 0) {
        _lastY = _momentum.destination;
        _duration = Math.max(_duration, _momentum.duration);
        _animate(_lastY, _startY, _duration);
      }
    }
  }

  function _translate(y) {
    let _y = y;

    const MAX_HEIGHT = scroller.offsetHeight - container.offsetHeight;
    if (_y < -MAX_HEIGHT) {
      log('scroll to bottom');
      _y = -MAX_HEIGHT;
      reachBottom = true;
    } else {
      reachBottom = false;
    }

    if (_y > 0) {
      log('scroll to top');
      _y = 0;
      reachTop = true;
    } else {
      reachTop = false;
    }

    _lastY = Math.round(_y);
    scroller.style.transform = `translate3d(0, ${_lastY}px, 0) scale(1)`;
  }

  function _animate(destY, startY, duration) {
    const startTime = Date.now();
    const destTime = startTime + duration;

    function step() {
      let now = Date.now();
      let newY;
      let easing;

      if (now >= destTime) {
        _translate(destY);
        console.log('scroll complete');
        log('scroll complete');
        return;
      }

      now = (now - startTime) / duration;
      easing = _easing(now);
      newY = (destY - startY) * easing + startY;
      _translate(newY);

      if (_isAnimating) {
        rAF(step);
      }
    }

    _isAnimating = true;
    step();
  }
  function _easing(k) {
    let kk = k;
    return Math.sqrt(1 - (--kk * kk));
  }
}
