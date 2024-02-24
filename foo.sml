val e = _export "f": (int * real * char -> char) -> unit;
val _ = e (fn (i, r, _) =>
           (print (concat ["i = ", Int.toString i,
                           "  r = ", Real.toString r, "\n"])
            ; #"g"))
val e = _export "f2": (Word8.word -> word array) -> unit;
val _ = e (fn w =>
           Array.tabulate (10, fn _ => Word.fromLargeWord (Word8.toLargeWord w)))

val e = _export "f3": (unit -> unit) -> unit;
val _ = e (fn () => print "hello\n");

val _ = print "success\n";

(*
fun entry () = print "hello\n"

val e = _export "entry": (unit -> unit) -> unit;
val _ = e entry
*)
