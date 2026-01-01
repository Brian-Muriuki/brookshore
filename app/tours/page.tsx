import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import ToursBrowser from "../../components/ToursBrowser";
import { tours } from "../../data/tours";

export const metadata = {
  title: "Tours",
};

export default function ToursPage() {
  return (
    <div className="py-10 sm:py-12">
      <Container>
        <SectionHeading
          eyebrow="Tours"
          title="Browse trips across Kenya"
          description="Filter by destination, duration, price range, and trip type."
        />

        <ToursBrowser tours={tours} />
      </Container>
    </div>
  );
}
