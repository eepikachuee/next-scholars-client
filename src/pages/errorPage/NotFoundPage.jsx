import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <img
        src="https://i.ibb.co/wrP01nd3/404-Error-Page-not-Found-with-people-connecting-a-plug-pana-1.png"
        alt="404 Not Found"
        className="max-w-md w-full mb-8"
      />

      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-muted-foreground text-lg mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-block px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
