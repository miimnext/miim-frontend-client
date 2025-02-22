import Button from "@/components/Button";

export default function Example() {
  return (
    <>
      <Button className="mb-2 " size="sm">
        sm
      </Button>
      <Button className="mb-2" size="md">
        md
      </Button>
      <Button className="mb-2" size="lg">
        lg
      </Button>
      <Button className="mb-2">Primary</Button>
      <Button loading className="mb-2">
        Loading
      </Button>
      <Button variant="danger" className="mb-2">
        danger
      </Button>
      <Button disabled className="mb-2">
        Disabled
      </Button>
      <Button variant="warn" className="mb-2">
        warn
      </Button>
    </>
  );
}
