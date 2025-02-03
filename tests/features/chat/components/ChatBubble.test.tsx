import { render, screen } from "@testing-library/react";

import ChatBubble from "../../../../src/features/chat/components/ChatBubble";

describe("User", () => {
  it("should render user chat ui", () => {
    render(<ChatBubble role="user" />);

    screen.debug();
    const chatBubble = screen.getByRole("container");
    expect(chatBubble).toBeInTheDocument();
  });
});
