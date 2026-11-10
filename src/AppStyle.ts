import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 720px;
    padding: 0 16px;
    color: #1f2937;
`;

export const Title = styled.h2`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
`;

export const Fieldset = styled.fieldset`
    border: 1px solid #d1d5db;
    border-radius: 10px;
    padding: 16px;
    background-color: white;
`;

export const Legend = styled.legend`
    padding: 0 8px;
    font-size: 14px;
    font-weight: 600;
    color: #4b5563;
`;

export const Form = styled.form`
    display: flex;
    gap: 8px;
`;

export const Select = styled.select`
    height: 40px;
    padding: 0 12px;
    font-size: 15px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: white;

    &:hover,
    &:focus {
        outline: 2px solid #2536eb;
        border-color: #2536eb;
    }
`;

export const Input = styled.input`
    height: 40px;
    padding: 0 12px;
    font-size: 15px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: white;
    flex: 1;
    min-width: 0;

    &:hover,
    &:focus {
        outline: 2px solid #2536eb;
        border-color: #2536eb;
    }
`;

export const AmountInput = styled.input`
    height: 40px;
    width: 120px;
    padding: 0 12px;
    font-size: 15px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: white;

    &:hover,
    &:focus {
        outline: 2px solid #2536eb;
        border-color: #2536eb;
    }
`;

export const AddButton = styled.button`
    height: 40px;
    padding: 0 20px;
    font-size: 15px;
    font-weight: 600;
    color: white;
    background-color: #2536eb;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #1d4ed8;
    }
`;

export const Table = styled.table`
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: white;
    border: 1px solid #d1d5db;

    th,
    td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
    }

    thead {
        background-color: #f3f4f6;
    }

    th {
        font-size: 14px;
        font-weight: 600;
        color: #4b5563;
    }

    tbody tr:hover {
        background-color: #f9fafb;
    }
`;

export const Empty = styled.td`
    text-align: center;
    padding: 32px 12px;
    color: #9ca3af;
`;

export const Income = styled.span`
    color: #2536eb;
    font-weight: 600;
`;

export const Expense = styled.span`
    color: #dc2626;
    font-weight: 600;
`;

export const DeleteButton = styled.button`
    padding: 6px 12px;
    font-size: 16px;
    color: #dc2526;
    background-color: white;
    border: 1px solid #fca5a5;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #fef2f2;
    }
`;

export const Summary = styled.div`
    margin-top: 20px;
    padding: 16px;
    border-radius: 10px;
    background-color: #f3f4f6;
`;

export const SummaryText = styled.h3`
    font-size: 16px;
    font-weight: 500;
    color: #4b5563;
`;

export const Balance = styled.h3`
    margin-top: 8px;
    font-size: 22px;
    font-weight: 700;
    color: #111827;
`;
