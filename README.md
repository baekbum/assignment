# react + typescript + scss 연습용 프로젝트

# 파일 구조
- action : reducer에서 사용할 type 및 타입 값 가져오기 위해 정의해놓은 곳 입니다.
- component : 문제 리스트와 유사문제 리스트의 컴포넌트들이 있는 곳 입니다.
- css : 컴포넌트에서 사용되는 css가 있는 곳 입니다.
- store : 문제 리스트, 유사문제 리스트, 현재 active 된 객체에 대한 정보를 담는 reducer 입니다.

# 동작 실행 설명
1. json 파일 로드 (App.js)
- App.js에서 json파일을 http 통신을 통하여 로드합니다.
- 문제 리스트와 유사문제 리스트 데이터를 각 Reducer에 저장합니다.

2. 문제 리스트 (Problem.js, ProblemItem.js)
- 문제리스트 state가 변경될 때 useEffect를 통하여 문제리스트 state가 존재하면 데이터를 로컬 변수에 저장합니다.
- 해당 변수를 map 함수를 이용하여 ProblemItem.js에 index와 Obj를 인자로 넘겨 컴포넌트를 반복적으로 렌더링 합니다.
- 유사문항 버튼 클릭 시 IsActive Reducer에 유사문제 리스트 보여주기 위해 similarsShow를 true, 선택한 object index, 선택한 object를 저장합니다.
- 문제리스트를 렌더링 할 때 해당 객체의 인덱스와 state에 저장된 선택한 object index 값을 비교하여 해당 유사문항 버튼만 활성화 합니다.
- 삭제 버튼 클릭 시 현재 문제리스트를 로컬 변수에 저장한 후 로컬 변수에서 해당 배열을 삭제하고 해당 배열을 Problems Reducer에 전달하여 새로운 state로 저장합니다.

3. 유사문제 리스트(Similars.js, SimilarItem.js)
- 문제리스트 state가 변경될 때 useEffect를 통하여 문제리스트 state가 존재하면 데이터를 로컬 변수에 저장합니다.
- 해당 변수를 map 함수를 이용하여 SimilarItem.js에 index와 Obj를 인자로 넘겨 컴포넌트를 반복적으로 렌더링 합니다.
- 추가 버튼 클릭 시 유사문제 리스트의 object를 활성화 된 문제 리스트 object 밑에 추가합니다. (이 때 선택한 문제 리스트의 인덱스 값은 IsActive Reducer의 index에 저장되어있습니다.) 이 후 유사문제 리스트에서 선택한 object를 삭제하고 문제리스트와 유사문제 리스트의 state를 변경합니다.
- 교체 버튼 클릭 시 유사문제 리스트의 object와 현재 활성화 된 문제 리스트의 object의 값을 바꾸고 state를 변경합니다.
