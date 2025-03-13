import { render, screen } from "@testing-library/react";
import UserDetails from "./UserDetails";

const mockUser = {
  id: 1,
  name: "Juan Pérez",
  username: "juanp",
  email: "juan@example.com",
  phone: "123-456-7890",
  website: "juanperez.com",
};

describe("UserDetails Component", () => {
  it("debería mostrar los detalles del usuario", () => {
    render(<UserDetails user={mockUser} />);

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();

    const userParagraph = screen
      .getByText("Usuario:", { exact: false })
      .closest("p");
    expect(userParagraph).toHaveTextContent("Usuario: juanp");

    const emailParagraph = screen
      .getByText("Email:", { exact: false })
      .closest("p");
    expect(emailParagraph).toHaveTextContent("Email: juan@example.com");
  });

  it("debería mostrar 'Cargando...' si no hay usuario", () => {
    render(<UserDetails user={undefined} />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });
});
