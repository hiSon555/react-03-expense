import { type ChangeEvent, useState } from "react";
import GlobalStyle from "./GlobalStyle.ts";
import {
    Container,
    Title,
    Fieldset,
    Legend,
    Form,
    Select,
    Input,
    AmountInput,
    AddButton,
    Table,
    Empty,
    Income,
    Expense,
    DeleteButton,
    Summary,
    SummaryText,
    Balance,
} from "./AppStyle.ts";

type Money = {
    type: string;
    title: string;
    amount: number;
};

function App() {
    const [type, setType] = useState<string>("expense");
    const [title, setTitle] = useState<string>("");
    const [amount, setAmount] = useState("");
    const [list, setList] = useState<Money[]>([]);

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleChangeAmount = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleChangeType = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        setType(e.target.value);
    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const parseAmount = Number(amount);
        const parseTitle = title.trim();

        if (parseAmount <= 0 || parseTitle === "") {
            return;
        }

        const newRecord = {
            type: type,
            title: title,
            amount: parseAmount,
        };

        setList([...list, newRecord]);

        setType("expense");
        setTitle("");
        setAmount("");
    };

    const handleDelete = (index: number) => {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
    };

    const totalIncome = list.reduce((sum, item) => {
        return item.type === "income" ? sum + item.amount : sum;
    }, 0);

    const totalExpense = list.reduce((sum, item) => {
        return item.type === "expense" ? sum + item.amount : sum;
    }, 0);

    const balance = totalIncome - totalExpense;

    return (
        <>
            <GlobalStyle />
            <Container>
                <Title>간단 가계부</Title>
                <Fieldset>
                    <Legend>내역 추가</Legend>
                    <Form onSubmit={handleSubmit}>
                        <Select onChange={handleChangeType} value={type}>
                            <option value={"expense"}>지출</option>
                            <option value={"income"}>수입</option>
                        </Select>
                        <Input
                            placeholder={"내용 (예: 점심, 월급)"}
                            onChange={handleChangeTitle}
                            value={title}
                        />
                        <AmountInput
                            placeholder={"금액"}
                            type={"number"}
                            min={0}
                            onChange={handleChangeAmount}
                            value={amount}
                        />
                        <AddButton type={"submit"}>추가</AddButton>
                    </Form>
                </Fieldset>
                <Table>
                    <thead>
                        <tr>
                            <th>구분</th>
                            <th>내용</th>
                            <th>금액</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length === 0 && (
                            <tr>
                                <Empty colSpan={4}>등록된 내역이 없습니다.</Empty>
                            </tr>
                        )}
                        {list.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.type === "income" ? "수입" : "지출"}</td>
                                    <td>{item.title}</td>
                                    <td>
                                        {item.type === "income" ? (
                                            <Income>+{item.amount.toLocaleString()}</Income>
                                        ) : (
                                            <Expense>-{item.amount.toLocaleString()}</Expense>
                                        )}
                                    </td>
                                    <td>
                                        <DeleteButton
                                            onClick={() => {
                                                handleDelete(index);
                                            }}>
                                            삭제
                                        </DeleteButton>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <Summary>
                    <SummaryText>
                        수입 :{" "}
                        <span style={{ color: totalIncome > 0 ? "blue" : "black" }}>
                            {totalIncome.toLocaleString()}원{" "}
                        </span>
                        / 지출 :{" "}
                        <span style={{ color: totalIncome > 0 ? "red" : "black" }}>
                            {totalExpense.toLocaleString()}원
                        </span>
                    </SummaryText>
                    <Balance>
                        잔액 :{" "}
                        <span
                            style={{
                                color: balance > 0 ? "blue" : balance < 0 ? "red" : "black",
                            }}>
                            {balance.toLocaleString()}원
                        </span>
                    </Balance>
                </Summary>
            </Container>
        </>
    );
}

export default App;
