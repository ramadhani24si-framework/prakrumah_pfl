import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Container from "../components/layout/Container";

// Import komponen Shadcn UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icon untuk tambahan
import { FaTerminal, FaRocket, FaGem } from "react-icons/fa";

export default function FiturShadcn() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Container>
      <PageHeader title="Fitur Shadcn UI" breadcrumb="UI Library Demo" />

      {/* Alert Component */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">1. Komponen Alert</h2>
        <Alert>
          <FaTerminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Kamu bisa menambahkan komponen Alert dari Shadcn UI ke project Na_store!
          </AlertDescription>
        </Alert>
        <Alert variant="destructive" className="mt-3">
          <FaTerminal className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>
            Ini contoh Alert dengan variant destructive (merah).
          </AlertDescription>
        </Alert>
      </div>

      {/* Dialog Component */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">2. Komponen Dialog (Modal)</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Buka Dialog Modal</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Selamat Datang di Na_store</DialogTitle>
              <DialogDescription>
                Ini adalah contoh komponen Dialog dari Shadcn UI. Modal ini bisa digunakan untuk konfirmasi, form, atau informasi tambahan.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600">
                Komponen ini sudah terintegrasi dengan Tailwind CSS dan bisa dikustomisasi sesuai kebutuhan.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Tutup
              </Button>
              <Button type="submit" onClick={() => setDialogOpen(false)}>
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs Component */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">3. Komponen Tabs</h2>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informasi</TabsTrigger>
            <TabsTrigger value="fitur">Fitur</TabsTrigger>
            <TabsTrigger value="kontak">Kontak</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="p-4 bg-gray-50 rounded-lg mt-2">
            <p className="text-gray-700">Na_store adalah toko aksesoris fashion yang menyediakan berbagai produk berkualitas seperti kalung, gelang, anting, dan cincin.</p>
          </TabsContent>
          <TabsContent value="fitur" className="p-4 bg-gray-50 rounded-lg mt-2">
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>💎 Produk Original 100%</li>
              <li>🚚 Gratis Ongkir minimal belanja Rp100.000</li>
              <li>🛡️ Garansi 14 hari untuk produk cacat</li>
              <li>🔄 Pengembalian dalam 7 hari</li>
            </ul>
          </TabsContent>
          <TabsContent value="kontak" className="p-4 bg-gray-50 rounded-lg mt-2">
            <p className="text-gray-700">📧 Email: hello@nastore.id</p>
            <p className="text-gray-700">📞 WhatsApp: 0812-3456-7890</p>
            <p className="text-gray-700">📍 Instagram: @na_store.id</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Card dengan Badge dan Button (sebagai tambahan demo) */}
      <div>
        <h2 className="text-xl font-bold mb-4">4. Demo Lengkap Card + Badge + Button</h2>
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FaGem className="text-pink" /> Na_store Pro
              </CardTitle>
              <Badge variant="secondary">Premium</Badge>
            </div>
            <CardDescription>
              Nikmati fitur eksklusif untuk member Na_store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Dapatkan akses ke koleksi eksklusif, diskon member, dan gratis ongkir tanpa minimal belanja!
            </p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button>Langganan Sekarang</Button>
            <Button variant="outline">Pelajari Lebih</Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}