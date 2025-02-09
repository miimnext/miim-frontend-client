import Button from "@/components/Button";

export default function Example() {
  return (
    <>
      <Button className="mb-2">Primary</Button>
      <Button variant="secondary" size="sm" className="mb-2">
        Secondary
      </Button>
      <Button variant="danger" size="lg" loading className="mb-2">
        Loading
      </Button>
      <Button variant="primary" size="md" disabled className="mb-2">
        Disabled
      </Button>
    </>
  );
}
