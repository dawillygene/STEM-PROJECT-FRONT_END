const OutcomeItem = ({ title, description }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white">
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
        <p className="text-gray-700 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default OutcomeItem;