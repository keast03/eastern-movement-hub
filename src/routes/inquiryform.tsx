import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/inquiryform")({
  component: TrainAtLifetimePage,
});

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email" })
    .max(255, { message: "Email must be under 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Please enter a valid phone number" })
    .max(25, { message: "Phone must be under 25 characters" })
    .regex(/^[+()\d\s\-.]+$/, { message: "Phone may only contain digits and + ( ) - ." }),
  birthday: z
    .date({ required_error: "Please select your birthday" })
    .refine((d) => d <= new Date(), { message: "Birthday cannot be in the future" })
    .refine((d) => d >= new Date("1900-01-01"), { message: "Please pick a valid date" }),
  inquiry: z
    .string()
    .trim()
    .min(10, { message: "Tell us a bit more — at least 10 characters" })
    .max(2000, { message: "Please keep this under 2000 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

function TrainAtLifetimePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goalOptions = [
    "Strength & Power",
    "Body Composition",
    "Mobility & Joint Health",
    "Athletic Performance",
    "Pain Management",
    "Nutritional Guidance"
  ];

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiry: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const injuriesEl = document.getElementById("injuries-input") as HTMLInputElement;
      const injuriesText = injuriesEl?.value?.trim() || "";

      const formattedFocusAreas = selectedGoals.length > 0 
        ? selectedGoals.join(", ") 
        : "None selected";

      const { error } = await supabase.from("leads").insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthday: format(values.birthday, "yyyy-MM-dd"),
        focus_areas: formattedFocusAreas,
        injuries: injuriesText || null,
        inquiry: values.inquiry,
        source: "lifetime_coral_gables",
      });

      if (error) throw error;

      toast.success("Inquiry received", {
        description: "We'll be in touch within 24 hours to schedule your consultation.",
      });
      
      setSelectedGoals([]);
      if (injuriesEl) injuriesEl.value = "";
      form.reset();
      navigate({ to: "/" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", {
        description: "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="mb-14">
            <div className="eyebrow mb-6">Life Time · Coral Gables</div>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.0] tracking-tight mb-6">
              Train with intent.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              For Life Time Coral Gables members. Share a few details and we'll reach out
              within 24 hours to schedule a complimentary 30-minute consultation.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-10 border-t border-border/60 pt-12"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="eyebrow text-xs">Full name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jane Doe"
                        autoComplete="name"
                        className="h-12 bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-10">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="eyebrow text-xs">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          className="h-12 bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="eyebrow text-xs">Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(305) 555-0100"
                          autoComplete="tel"
                          className="h-12 bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="eyebrow text-xs">Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              "h-12 justify-between bg-transparent border-0 border-b border-border rounded-none px-0 hover:bg-transparent text-base font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? format(field.value, "MMMM d, yyyy")
                              : "Select your birthday"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-60" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="text-xs">
                      Used to tailor your training program.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <label className="block eyebrow text-xs text-muted-foreground">
                  Primary Focus Areas (Select All That Apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {goalOptions.map((goal) => {
                    const isSelected = selectedGoals.includes(goal);
                    return (
                      <Button
                        key={goal}
                        type="button"
                        variant="outline"
                        onClick={() => toggleGoal(goal)}
                        className={cn(
                          "h-10 px-4 rounded-full text-xs uppercase tracking-wider border transition-all duration-200",
                          isSelected
                            ? "bg-foreground text-background border-foreground hover:bg-foreground/90 hover:text-background"
                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground bg-transparent"
                        )}
                      >
                        {goal}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 flex flex-col">
                <label htmlFor="injuries-input" className="eyebrow text-xs text-muted-foreground">
                  Injuries or Movement Restrictions (If Any)
                </label>
                <Input
                  id="injuries-input"
                  name="injuries"
                  placeholder="e.g., Past left knee meniscus tear, occasional lower back stiffness"
                  className="h-12 bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                />
              </div>

              <FormField
                control={form.control}
                name="inquiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="eyebrow text-xs">Tell us about your goals</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="Where are you in your training? What are you looking to build — strength, mobility, sport-specific performance? Anything we should know about your schedule or history?"
                        className="bg-transparent border border-border rounded-none px-4 py-3 focus-visible:ring-0 focus-visible:border-foreground text-base resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-4">
                <p className="text-xs text-muted-foreground max-w-sm">
                  Submitting this form gives us permission to contact you about training. We
                  never share your information.
                </p>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 px-8 rounded-none uppercase tracking-[0.18em] text-xs"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-16 pt-10 border-t border-border/60 text-sm text-muted-foreground">
            Not a Life Time member?{" "}
            <Link to="/" className="text-foreground underline-offset-4 hover:underline">
              View training packages
            </Link>
            .
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}