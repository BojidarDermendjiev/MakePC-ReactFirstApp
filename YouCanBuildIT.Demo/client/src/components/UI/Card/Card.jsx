import PropTypes from "prop-types";
import "./Card.css";

const Card = ({
  children,
  title,
  subtitle,
  image,
  imageAlt,
  actions,
  className = "",
  ...props
}) => {
  return (
    <div className={`card ${className}`} {...props}>
      {image && (
        <div className="card__image">
          <img src={image} alt={imageAlt || title || "Card image"} />
        </div>
      )}
      
      <div className="card__content">
        {(title || subtitle) && (
          <div className="card__header">
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
        )}
        
        <div className="card__body">{children}</div>
        
        {actions && <div className="card__actions">{actions}</div>}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  actions: PropTypes.node,
  className: PropTypes.string,
};

export default Card;