import Card from "../card";

export default function SupportCard() {
  return (
    <Card title="Support" className="h-full">
      <p>
        If you have questions or need support, please send an email to{" "}
        <a href="mailto:aaron@yarbz.digital" className="font-bold">
          aaron@yarbz.digital
        </a>
        . I&apos;ll get back to you as soon as I can!
      </p>
    </Card>
  );
}
