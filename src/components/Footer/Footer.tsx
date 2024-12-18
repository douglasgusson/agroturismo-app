export const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2"></div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Agroturismo App. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
