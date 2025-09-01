import PropTypes from "prop-types";
import "./PageLayout.css";

const PageLayout = ({
  children,
  title,
  subtitle,
  breadcrumbs,
  actions,
  className = "",
  maxWidth = "1200px",
}) => {
  return (
    <div className={`page-layout ${className}`}>
      <div className="page-layout__container" style={{ maxWidth }}>
        {(title || subtitle || breadcrumbs || actions) && (
          <header className="page-layout__header">
            {breadcrumbs && (
              <nav className="page-layout__breadcrumbs">{breadcrumbs}</nav>
            )}
            
            <div className="page-layout__header-content">
              <div className="page-layout__header-text">
                {title && <h1 className="page-layout__title">{title}</h1>}
                {subtitle && <p className="page-layout__subtitle">{subtitle}</p>}
              </div>
              
              {actions && (
                <div className="page-layout__actions">{actions}</div>
              )}
            </div>
          </header>
        )}
        
        <main className="page-layout__content">{children}</main>
      </div>
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  breadcrumbs: PropTypes.node,
  actions: PropTypes.node,
  className: PropTypes.string,
  maxWidth: PropTypes.string,
};

export default PageLayout;