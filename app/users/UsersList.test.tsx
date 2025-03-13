import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UsersList from "@/app/users/UsersList";
import { User } from "@/hooks/useUsers";

const mockUsers: User[] = [
  {
    id: 1,
    name: "Juan Pérez",
    username: "juanp",
    email: "juan@example.com",
    phone: "123-456-7890",
    website: "juanperez.com",
  },
  {
    id: 2,
    name: "Ana Gómez",
    username: "anag",
    email: "ana@example.com",
    phone: "987-654-3210",
    website: "anagomez.com",
  },
];

describe("UsersList Component", () => {
  it("debería renderizar la lista de usuarios", () => {
    render(<UsersList initialUsers={mockUsers} />);
    expect(screen.getByText("Juan Pérez (@juanp)")).toBeInTheDocument();
    expect(screen.getByText("Ana Gómez (@anag)")).toBeInTheDocument();
  });

  it("debería filtrar usuarios correctamente", async () => {
    render(<UsersList initialUsers={mockUsers} />);
    const input = screen.getByPlaceholderText("Buscar por nombre o usuario...");

    fireEvent.change(input, { target: { value: "juan" } });

    await waitFor(() => {
      expect(screen.getByText("Juan Pérez (@juanp)")).toBeInTheDocument();
      expect(screen.queryByText("Ana Gómez (@anag)")).toBeNull();
    });
  });

  it("debería mostrar 'No se encontraron usuarios' si no hay coincidencias", async () => {
    render(<UsersList initialUsers={mockUsers} />);
    const input = screen.getByPlaceholderText("Buscar por nombre o usuario...");

    fireEvent.change(input, { target: { value: "xxxx" } });

    await waitFor(() => {
      expect(
        screen.getByText("No se encontraron usuarios.")
      ).toBeInTheDocument();
    });
  });
});
