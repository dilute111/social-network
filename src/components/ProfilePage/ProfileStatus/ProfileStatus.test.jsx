import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import ProfileStatus from "./ProfileStatus";


describe("ProfileStatus component", () => {
// Проверка, рендерится ли статус
    test("renders status from props", () => {
        render(<ProfileStatus status="барбара джиз" updateStatus={() => {
        }}/>);
        expect(screen.getByText("барбара джиз")).toBeInTheDocument();
    });

// Проверка, что при двойном клике активируется режим редактирования
    test("activates edit mode on double click", () => {
        render(<ProfileStatus status="Test status" updateStatus={() => {
        }}/>);

        const span = screen.getByText("Test status");
        fireEvent.doubleClick(span);

        expect(screen.queryByText("Test status")).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("Test status")).toBeInTheDocument();
    });

// Проверка, что при блюре вызывается updateStatus
    test("calls updateStatus on blur", () => {
        const mockUpdateStatus = jest.fn();
        render(<ProfileStatus status="Test status" updateStatus={mockUpdateStatus}/>);

        const span = screen.getByText("Test status");
        fireEvent.doubleClick(span);

        const input = screen.getByDisplayValue("Test status");
        fireEvent.change(input, {target: {value: "New status"}});
        fireEvent.blur(input);

        expect(mockUpdateStatus).toHaveBeenCalledWith("New status");
    });

// Проверка, что статус обновляется при новом пропсе
    test("updates status when new props are received", () => {
        const {rerender} = render(<ProfileStatus status="Old status" updateStatus={() => {
        }}/>);
        expect(screen.getByText("Old status")).toBeInTheDocument();

        rerender(<ProfileStatus status="New status" updateStatus={() => {
        }}/>);
        expect(screen.getByText("New status")).toBeInTheDocument();
    });
})