const OutcomeItem = ({ title, description, value, unit, additional_info, icon_class, color }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: color || '#FD9148' }}
        >
          <i className={icon_class || 'fas fa-arrow-right'}></i>
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
        <p className="text-gray-700 mt-1">{description}</p>
        {value && (
          <div className="mt-2 flex items-center">
            <span className="text-2xl font-bold" style={{ color: color || '#FD9148' }}>
              {value}
            </span>
            {unit && (
              <span className="text-lg font-medium text-gray-600 ml-1">
                {unit}
              </span>
            )}
          </div>
        )}
        {additional_info && (
          <p className="text-sm text-gray-500 mt-1 italic">
            {additional_info}
          </p>
        )}
      </div>
    </div>
  );
};

export default OutcomeItem;