class App {
  $app = document.querySelector(".app");
  $btnPlus = document.querySelector(".btn-plus");
  $btnMinus = document.querySelector(".btn-minus");
  $text = document.querySelector(".text");

  count = 0;

  constructor({ initState }) {
    this.count = initState.count;

    this.main();
  }

  // 상태 조작
  setState(nextState) {
    // 만약 값이 없다면 기본값 그대로 사용한다.
    this.count = nextState.count ?? this.count;

    this.render();
  }

  // 화면 그리는동작
  render() {
    this.$text.innerHTML = `
            <span>${this.count}</span>
        `;
  }

  // 초기 셋팅
  main() {
    this.$btnPlus.addEventListener("click", (e) => {
      this.setState({
        count: ++this.count,
      });
    });

    this.$btnMinus.addEventListener("click", (e) => {
      this.setState({
        count: --this.count,
      });
    });
  }
}

new App({
  initState: {
    count: 0,
  },
});
