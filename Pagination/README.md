# Pagination

![pagination](./pagination.png)

## 페이지네이션에서 필요한것

> `currentPage`: 현재 페이지  
> `maxPage`: 페이지 네이션에서 전체 페이지수 `Math.ceil(JSON 데이터수 / 보여줄 갯수)`  
> `SHOW_BODY_DATA_NUMBER`: 화면에서 보여질 데이터 수 (몸체에 들어갈 데이터수)

> 주의사항) 5개 미만의 페이지네이션 예외처리 주의

```javascript
// 알고리즘
if (currentPage < 5 / 2) {
  // 1, 2
} else if (currentPage > maxPage - 5 / 2) {
  // n-1, n
} else {
  // 중앙 정렬
}
```

**20210817**
