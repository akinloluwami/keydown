import Link from "next/link";
import { VscLinkExternal } from "react-icons/vsc";

interface Props {
  onClick: () => void;
  url: string;
}

const Published: React.FC<Props> = ({ onClick, url }) => {
  return (
    <div className="h-screen flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-black z-50 flex-col">
      <div className="max-w-3xl">
        <h1 className="text-6xl font-bold">
          Boom! It's out there. <br />
          What will you write next?
        </h1>
        <div className="flex mt-10 items-center w-full gap-x-5">
          <button
            className="font-medium text-that-grey-1 hover:bg-that-grey-1/10 transition-colors px-1 w-fit flex items-center gap-x-2"
            onClick={onClick}
          >
            Back to editor
          </button>
          <Link
            href={url}
            className="flex items-center gap-x-2 border border-dashed border-that-grey text-that-grey-1 font-medium py-2 px-5 hover:bg-that-grey-1/10 hover:text-white transition-all duration-200 ease-in-out"
          >
            View post <VscLinkExternal />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Published;
