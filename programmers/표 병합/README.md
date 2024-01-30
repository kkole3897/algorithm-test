## 표 병합

### 문제

- https://school.programmers.co.kr/learn/courses/30/lessons/150366
- 표의 크기 50 x 50
- 각 셀은 문자열 값을 가질 수 있고, 다른 셀과 병합될 수 있음
- 세로 위치를 r, 가로 위치를 c로 (r, c)라고 표현
- 명령어
  - UPDATE r c value
    - (r, c) 위치의 셀의 값을 value로 변경
  - UPDATE value1 value2
    - value1을 가진 모든 셀의 값을 value2로 변경
  - MERGE r1 c1 r2 c2
    - (r1, c1) 셀과 (r2, c2) 셀 병합
    - 같은 위치인 경우 무시
    - 선택한 두 셀만 영향, 그 사이에 위치한 셀은 그대로
    - 병합된 셀은 두 셀 중 값을 가진 셀의 값을 따라감
    - 두 셀 모두 값이 있을 경우 (r1, c1)의 값을 따라감
  - UNMERGE r c
    - (r, c) 위치의 셀 병합을 모두 해제
    - 모든 셀은 빈 셀이 됨
    - 병합 해제 전 값이 있던 경우 (r, c) 셀이 그 값을 따라감
  - PRINT r c
    - (r, c) 셀의 값을 출력
    - 빈 경우 EMPTY 출력
- 명령어들이 담긴 1차원 배열 commands가 주어졌을 때 PRINT 명령어에 대한 실행결과를 순서대로 1차원 문자열에 담아 return
  - 1 <= commands의 길이 <= 1,000
  - commands는 1개 이상의 PRINT 명령어 포함
  - commands의 원소는 위의 명령어 종류 중 하나
