import logo from 'assets/images/logo.png';

export default function Loader() {
  return (
    <section className="w-full flex justify-center h-full items-center">
      <img src={logo} alt="Whatsapp Logo" className="object-contain" />
    </section>
  );
}


