const Card = ({ title, description, iconClass, color }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-custom hover:shadow-lg transition-all">
      <div className={`w-16 h-16 bg-${color} rounded-full flex items-center justify-center text-white text-2xl mb-4`}>
        <i className={iconClass}></i>
      </div>
      <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default Card;