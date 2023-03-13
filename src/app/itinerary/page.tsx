import Image from "next/image";

export default function Page() {
  return (
    <div className="py-24">
      <div className="card bg-base-100 shadow-xl lg:card-side">
        <figure>
          <Image src="/img/nature.svg" alt="Movie" height={100} width={100} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn-primary btn">Listen</button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl lg:card-side">
        <figure>
          <Image src="/img/nature.svg" alt="Movie" height={100} width={100} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn-primary btn">Listen</button>
          </div>
        </div>
      </div>
    </div>
  );
}
