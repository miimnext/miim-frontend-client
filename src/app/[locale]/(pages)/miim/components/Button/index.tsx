import Button from "@/app/components/Button";

export default function Example() {
  return (
    <div className="max-w-3xl mx-auto p-4">
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
    </div>
  );
}
