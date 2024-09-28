const LoadingSpinner = () => {
  return (
    <div class="d-flex justify-content-center">
      <div
        class="spinner-border"
        style={{ width: "3rem", height: "3rem", margin: "10%" }}
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default LoadingSpinner;
