import { Button, Link } from "@/components/ui";

export default function DevPage() {
  return (
    <>
      <Button variant="primary" size="lg">
        Click me here
      </Button>

      <Link href="/dev" variant="primary" size="lg">
        Go to Dev Page
      </Link>
    </>
  );
}
