import { Icon } from "@iconify/react";

const Loading = ({ loading }) => {
  return (
    <div
      className={`fixed left-0 right-0 bottom-0 top-0  z-50 bg-black opacity-80 flex items-center justify-center ${
        loading ? "" : "hidden"
      } transition-all`}
    >
      <Icon
        className="h-20 w-20 text-white"
        icon="eos-icons:three-dots-loading"
      />
    </div>
  );
};

export default Loading;
