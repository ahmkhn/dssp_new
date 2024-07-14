import { TodoList } from "@/components/todo-list";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Worldmap from "@/components/world-map";

export default async function MapNotSignedIn() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //if (!user) {
    //return redirect("/login");
  //}

  /*const { data: todos } = await supabase
    .from("todos")
    .select()
    .order("inserted_at", { ascending: false });*/

    return (
      <>
        <section className="p-3 pt-6 max-w-6xl w-full flex flex-col gap-6">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-10">
              Interactive World Map
            </h1>
          </div>
          <Separator className="w-full" />
          <p className="scroll-m-20 text-lg font-extrabold tracking-tight lg:text-xl text-center">
            Welcome to the map! Scroll around and click on markers to find out about other people's research!
          </p>
          <p className="scroll-m-20 text-lg font-extrabold tracking-tight lg:text-xl text-center">
            Click on the map to input a marker, make sure you're signed in first!
          </p>
        </section>
        <section className="p-3 pt-6 max-w-full w-full flex flex-col gap-6">
          <div className="flex gap-4 w-full">
            <div className="w-1/4 p-6 border-gray-300 border rounded-lg shadow-lg bg-gray-200 flex flex-col h-[40rem]" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <h2 className="text-2xl font-bold mb-6 text-center text-black">User Spotlight</h2>
              <h3 className="font-semibold text-gray-700 text-center mb-4">Weekly user spotlight, submit a form here for a chance to be featured!</h3>
              {/* User spotlight content here */}
              <div className="bg-gray-100 p-6 rounded-md text-center">
                <p className="font-semibold text-3xl text-gray-900">User Name</p>
                <p className="text-md text-gray-800">Title</p>
                <p className="text-sm text-gray-600">Research details or bio...</p>
                <p className="text-md text-gray-800">Example Location</p>
              </div>
            </div>
            <div className="w-1/2 h-[70vh] max-h-full border-black rounded-lg margin" style={{borderRadius: '8px', overflow: 'hidden'}}>
              <Worldmap authorized={user !== null} />
            </div>
          </div>
      </section>
      </>
      
    );
}
