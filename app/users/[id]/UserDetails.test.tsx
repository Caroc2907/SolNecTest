import { render, screen } from "@testing-library/react";
import UserDetails from "./UserDetails";
import { User } from "@/types/types";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

const mockUser: User = {
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
    expect(screen.getByText("juan@example.com")).toBeInTheDocument();
    expect(screen.getByText("juanperez.com")).toBeInTheDocument();
  });

  it("debería mostrar 'Cargando...' si no hay usuario", () => {
    render(<UserDetails user={undefined} />);

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });
});
