export const ItineraryEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-semibold text-gray-900">Roteiro vazio</p>
      <p className="text-lg text-gray-500">
        Adicione locais ao seu roteiro para visualizá-los aqui.
      </p>
    </div>
  );
};
