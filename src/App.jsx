import {useState} from "react";

function App() {
    const [type, setType] = useState("expense");    // 구분을 담당하는 state
    const [title, setTitle] = useState("");     // 내용을 담당하는 state
    const [amount, setAmount] = useState("");    // 금액을 담당하는 state
    const [list, setList] = useState([]);

    const handleChangeTitle = (e) => { setTitle(e.target.value); }

    const handleChangeAmount = (e) => {setAmount(e.target.value); }

    const handleChangeType = (e) => {setType(e.target.value); }

    const handleSubmit = (e) => {
        e.preventDefault();

        // 입력된 3개의 state를 통해 list에 저장할 객체를 만들어야 함
        // 객체의 프로퍼티는 key: value의 꼴
        // key 자리에 쓴 건, string으로 자바스크립트가 판단하고 /
        // value 자리에 쓴 건, 변수로 판단

        // list에 저장을 하기 전에
        // '저장을 하지 말아야 될 조건' 탐색을 미리 진행해줘야 됨

        // 저장을 하지 말아야 할 조건 1
        // 숫자가 정상적이어야 함 => 입력된 숫자가 + 값이어야 함

        // 저장을 하지 말아야 할 조건 2
        // 'title에 글자가 있어야 함'을 체크하기 위해
        // string 타입의 변수에 trim() 메서드를 쓸 수 있음
        // trim() 메서드 : string의 앞과 뒤에 띄어쓰기가 있다면 그 공백을 삭제해주는 메서드

        const parseAmount = Number(amount);
        const parseTitle = title.trim()

        if (parseAmount <= 0 || parseTitle === "") {
            return;
        }

        const newRecord = {
            type: type,
            title: title,
            // amount(금액)은 input에서 들어올 때, string으로 들어옴
            // 이걸 number 타입으로 변환해서 저장해야 함
            amount: parseAmount,
        };

        setList([...list, newRecord]);

        setType("expense");
        setTitle("");
        setAmount("");
    }

    const handleDelete = (index) => {
        // react는 state의 값을 감시해서 화면을 갱신하는데, 그 감시 대상은 값은 stack 영역임
        // 그러니까 새로운 array를 만들어서 list를 갱신해줘야 함
        const newList = list.filter((item, i)=> i !== index);
        setList(newList);
    }

    const totalIncome = list.reduce((sum, item) => {
        // type이 income인 것들의 합계
        // 함수 몸통에 써주는 내용은 하나의 요소가 빠져나온 상태의 식
        // item은 객체
        return item.type === "income" ? sum + item.amount : sum;

    }, 0);

    const totalExpense = list.reduce((sum, item) => {
        // type이 expense인 것들의 합계
        return item.type === "expense" ? sum + item.amount : sum;
    }, 0);

    const balance = totalIncome - totalExpense;


    return (
        <>
            <h2>간단 가계부</h2>
            <fieldset>
                <legend>내역 추가</legend>
                <form onSubmit={handleSubmit}>
                    <select
                        onChange={handleChangeType}
                        value={type}
                    >
                        <option value={"expense"}>지출</option>
                        <option value={"income"}>수입</option>
                    </select>
                    <input
                        placeholder={"내용 (예: 점심, 월급)"}
                        onChange={handleChangeTitle}
                        value={title}
                    />
                    <input
                        placeholder={"금액"}
                        type={"number"}
                        min={0}
                        onChange={handleChangeAmount}
                        value={amount}
                    />
                    <button type={"submit"}>추가</button>
                </form>
            </fieldset>
            <table border={1}
                   cellPadding={10}
                   style={{
                       width: "100%",
                       borderCollapse: "collapse",
                       marginTop: "16px"
                   }}>
                <thead style={{backgroundColor: "#f2f2f2"}}>
                <tr>
                    <th>구분</th>
                    <th>내용</th>
                    <th>금액</th>
                    <th>관리</th>
                </tr>
                </thead>
                <tbody>
                {/* 조건부 렌더링 : list 요소가 없으면 안내 문구를 보여주도록 */}
                {list.length === 0 && (
                    <tr>
                        <td colSpan={4} style={{textAlign: "center"}}>
                            등록된 내역이 없습니다.</td>
                    </tr>
                )}
                {list.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.type === "income" ? "수입" : "지출"}</td>
                            <td>{item.title}</td>
                            <td style={{
                                color: item.type === "income" ? "blue" : "red",
                                borderColor: "black"
                            }}>
                                {item.type === "income" ? "+" : "-"}
                                {item.amount.toLocaleString()}
                            </td>
                            <td>
                                <button onClick={() => {
                                    // 해야되는 일
                                    // list 에서 index 번호의 요소를 삭제
                                    handleDelete(index);
                                }}>삭제</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>

            {/*
                list라고 하는 array(state)를 가지고 하나의 값을 구하는 행위
                => list.reduce() => 얘의 코드가 길어지겠다 => 상단에 코드를 쓰자
            */}
            <h3>
                수입 :
                <span style={{
                    color: totalIncome > 0 ? "blue" : "black"}}>
                    {totalIncome.toLocaleString()}원</span> /
                지출 :
                <span style={{
                    color: totalIncome > 0 ? "red" : "black"}}>
                    {totalExpense.toLocaleString()}원</span>
            </h3>
            <h3>잔액 :
                <span style={{
                    color: balance > 0 ? "blue" : balance < 0 ? "red" : "black"}}>{balance.toLocaleString()}원</span>
            </h3>
        </>
    );
}

export default App;

