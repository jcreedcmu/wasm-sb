fun entry () = print "hello\n"

val e = _export "entry": (unit -> unit) -> unit;
val _ = e entry
