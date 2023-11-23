import ImageComponent1, {
  ImageComponent2,
  ImageComponent3,
  ImageComponent4,
  ImageComponent5,
} from "./imageComponent";

const GalleryComponent = () => {
  return (
    <div className=" rounded-lg px-20 bg-slate-50 py-5">
      <div className="grid grid-cols-3 grid-rows-2 gap-0">
        <div className="col-span-1 row-span-2 p-0 m-0 hover:scale-105 ">
          <ImageComponent1 />
        </div>
        <div className="col-span-1 row-span-1 p-0 m-0 hover:scale-105">
          <ImageComponent2 />
        </div>
        <div className="col-span-1 row-span-1 p-0 m-0 hover:scale-105">
          <ImageComponent4 />
        </div>
        <div className="col-span-1 row-span-1 p-0 m-0 hover:scale-105">
          <ImageComponent3 />
        </div>
        <div className="col-span-1 row-span-1 p-0 m-0 hover:scale-105">
          <ImageComponent5 />
        </div>
      </div>
    </div>
  );
};

export default GalleryComponent;
