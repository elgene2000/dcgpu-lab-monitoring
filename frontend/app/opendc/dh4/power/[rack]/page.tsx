import ClientPowerRack from "@/components/ClientPowerRack";

export default async function PowerRack({
  params,
}: {
  params: Promise<{ rack: string }>;
}) {
  const { rack } = await params;

  return <ClientPowerRack datahall="dh4" site="odcdh4" rack={rack} />;
}
