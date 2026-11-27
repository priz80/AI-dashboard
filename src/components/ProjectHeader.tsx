export const ProjectHeader = () => {
  return (
    <header className="project-header">
      <div>
        <div className="breadcrumb">
          PROJECT <span>/</span> <strong>web-platform</strong>
        </div>
        <h1>Recent runs</h1>
        <p className="page-description">
          Monitor activity across your project.
        </p>
      </div>
      <button className="primary-button" type="button">
        <span>+</span> New run
      </button>
    </header>
  );
};
