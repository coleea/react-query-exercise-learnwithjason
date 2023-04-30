# react-query

- The most important three elements of react-query
  - useQuery()
    - it's result can be cached when success
  - useMutation()
  - Query Invalidation
    - by queryCache 
    - it is just object that contains getter and setter


- 문제
  - zod schema 불일치가 발생시
    - status : "error"가 아닌 "loading"으로 표기
    - fetch를 3번 retry -> retry 필요없음


- 아래 영상 꼭 볼것
  - Tara't aralin natin sina Zod at React Query.
  - https://www.youtube.com/watch?v=FZ7VJP-TKMo