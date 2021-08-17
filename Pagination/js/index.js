class App {
  SHOW_BODY_DATA_NUMBER = 10; // 화면에서 보여질 데이터 수
  SHOW_PAGINATION_NUMBER = 5; // 페이지 네이션 표출할 박스 수

  $body = document.querySelector(".body");
  $pagi = document.querySelector(".pagination ul");

  data; // 서버로 부터 받아온 전체 데이터
  showData = []; // 데이터중 보여줄 데이터
  maxPage = 1; // 페이지 전체 숫자
  currentPage = 1; // 페이지 네이션 선택 숫자

  constructor(data) {
    this.data = data;

    this.init();
    this.main();
  }

  /**
   * 필요한정보 현제 페이지, 전체 페이지
   *
   */
  paginationAlgol() {
    let $paginationList;
    if (this.currentPage < 5 / 2) {
      // 1 ,2 일경우
      // 1 ~ 5

      // 5보다 작은 경우
      const arr = this.maxPage <= 5 ? Array(this.maxPage) : Array(5);

      $paginationList = arr
        .fill(0)
        .map((elem, i) => {
          if (this.currentPage !== i + 1) {
            return `<li>${i + 1}</li>`;
          } else {
            return `<li class="js-current-page">${i + 1}</li>`;
          }
        })
        .join("");
    } else if (this.currentPage > this.maxPage - 5 / 2) {
      // 끝에서 n - 1 , n 일 경우
      // n-4, n -3, n-2, n-1, n
      $paginationList = Array(5)
        .fill(0)
        .map((elem, i) => {
          if (this.currentPage !== this.maxPage - i) {
            return `<li>${this.maxPage - i}</li>`;
          } else {
            return `<li class="js-current-page">${this.maxPage - i}</li>`;
          }
        })
        .reverse()
        .join("");
    } else {
      // 나머지일 경우 중앙정렬
      $paginationList = Array(5)
        .fill(0)
        .map((elem, i) => {
          if (i !== 2) {
            return `<li>${this.currentPage + (i - 2)}</li>`;
          } else {
            return `<li class="js-current-page">${
              this.currentPage + (i - 2)
            }</li>`;
          }
        })
        .join("");
    }

    $paginationList = `
      <li class="js-left-pagination">&#60;</li>
      ${$paginationList}
      <li class="js-right-pagination">&#62;</li>`;

    return $paginationList;
  }

  /**
   * @param {HTMLElement} $node
   * @description 페이지네이션 바디(데이터) 렌더링 부분
   */
  renderBody($node) {
    $node.innerHTML = ""; //reset

    this.showData.forEach((elem, i) => {
      const $p = document.createElement("p");
      $p.textContent = elem.name;
      $node.append($p);
    });
  }

  /**
   * @param {HTMLElement} $node
   * @description 페이지네이션 렌더링 부분
   */
  renderPagi($node) {
    $node.innerHTML = ""; // reset
    $node.innerHTML = this.paginationAlgol();
  }

  init() {
    this.maxPage = Math.ceil(this.data.length / this.SHOW_PAGINATION_NUMBER); // 전체 데이터 수 구하기
    this.showData = this.data.slice(
      0,
      this.currentPage * this.SHOW_BODY_DATA_NUMBER
    ); // 보여줄 데이터 복사하기

    console.log(this.maxPage);
    console.log(this.showData);

    this.$pagi.addEventListener("click", (e) => {
      if (!(e.target.nodeName === "LI")) {
        return;
      }
      this.currentPage = parseInt(e.target.textContent); // 현제 페이지 이동
      // this.showData = this.data.slice(
      //   (this.currentPage * this.SHOW_BODY_DATA_NUMBER) - 1,
      //   (this.currentPage * this.SHOW_BODY_DATA_NUMBER)
      // );
      this.reRender(); // 리렌더링;
    });
  }

  reRender() {
    this.renderBody(this.$body);
    this.renderPagi(this.$pagi);
  }

  async main() {
    this.renderBody(this.$body);
    this.renderPagi(this.$pagi);
  }
}

new App(data);
