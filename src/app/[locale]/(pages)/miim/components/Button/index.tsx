import Button from "@/app/components/Button";

export default function Example() {
  return (
    <>
      <Button className="mb-2">Primary</Button>
      <Button variant="secondary" size="sm" className="mb-2">
        Secondary
      </Button>
      <Button variant="danger" size="lg" isLoading className="mb-2">
        Loading
      </Button>
      <Button variant="primary" size="md" isDisabled className="mb-2">
        Disabled
      </Button>
    </>
  );
}
