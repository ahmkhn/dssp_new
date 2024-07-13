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
    <section className="p-3 pt-6 max-w-4xl w-full flex flex-col gap-16">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-10">
        Interactive World Map
      </h1>
      <Separator className="w-full" />
      <div className="h-[70vh] mt-20 max-h-full border-black rounded-lg margin w-full" style={{borderRadius:'8px', overflow:'hidden'}}>
        <Worldmap authorized={user !== null}/>
      </div>
    </section>
  );
}
