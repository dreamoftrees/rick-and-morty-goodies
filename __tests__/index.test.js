import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LoginPage from "../src/app/login/page";

// Mock useRouter
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe('Login', () => {
    it('renders the login form', () => {
        render(<LoginPage />)

        const nameInput = screen.getByRole('textbox', {
            name: /name/i
        });

        const titleInput = screen.getByRole('textbox', {
            name: /title/i
        })

        expect(nameInput).toBeInTheDocument();
        expect(titleInput).toBeInTheDocument();
    })
})
