import Header from "@/components/Header";


const Home = () => {
  return (
    <div>
        <Header />
        <div className="flex flex-col mt-10">
            <h1 className="text-3xl text-center">Welcome to <span className="text-3xl font-[Kablammo]">Co-Work</span></h1>
            <p className="text-center mt-5 text-lg">A place where you can work together with your friends</p>
        </div>
    </div>
  )
};

export default Home;