import { render, screen, waitFor } from "@testing-library/react";
import UsersPage from "./page";
import axios from "axios";

jest.mock("axios");

const mockUsers = [
  {
    id: 1,
    name: "Juan Pérez",
    username: "juanp",
    email: "juan@example.com",
    phone: "123-456-7890",
    website: "juanperez.com",
  },
];

describe("UsersPage Component", () => {
  it("debería obtener y mostrar la lista de usuarios desde la API", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUsers });

    render(await UsersPage());

    await waitFor(() => {
      expect(screen.getByText("Lista de Usuarios")).toBeInTheDocument();
      expect(screen.getByText("Juan Pérez (@juanp)")).toBeInTheDocument();
    });
  });

  it("debería manejar errores al obtener usuarios", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Error de API"));

    render(await UsersPage());

    await waitFor(() => {
      expect(screen.getByText("Lista de Usuarios")).toBeInTheDocument();
    });
  });
});
