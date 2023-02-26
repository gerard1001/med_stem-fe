import First from './First';
import SecondStep from './Second';
import ThirdStep from './Third';

export default function Form() {
  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <First />;
      case 1:
        return <SecondStep />;
      case 2:
        return <ThirdStep />;
      default:
        return <First />;
    }
  };

  return (
    <>
      <Box>{conditionalComponent()}</Box>
    </>
  );
}
