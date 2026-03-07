import PageNotFound404 from "@/common/NotFoundError";
import PageMetadata from "@/common/PageMetadata";

const NotFound = () => {
  return (
    <>
      <PageMetadata title="404 | Page Not Found" />
      <PageNotFound404 />
    </>
  );
};

export default NotFound;
