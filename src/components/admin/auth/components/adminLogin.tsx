function AdminLoginComponent() {
	return (
		<div>
			<div className="h-screen flex justify-center items-center h-screen p-2 bg-gray-950">
				<form className=" border-2 border-white px-5 py-5 mx-auto w-full md:w-1/2 xl:w-1/3 flex flex-col justify-center items-center gap-10 bg-secondry rounded-lg">
					<div className="text-xl text-white">ورود ادمین</div>
					<input
						type="text"
						className="bg-white border-secondry border-2 w-full h-12 rounded-md text-black p-2 outline-none"
						placeholder="نام کاربری"
					/>
					<input
						type="text"
						className="bg-white w-full h-12 rounded-md text-black p-2 outline-none"
						placeholder="رمزعبور"
					/>
					<button className=" w-full text-black bg-white h-12 rounded-2xl text-xl hover:cursor-pointer hover:bg-primary">
						ورود
					</button>
				</form>
			</div>
		</div>
	);
}

export default AdminLoginComponent;
