import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, LogOut, Package, Star, Leaf, LayoutDashboard } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;

const emptyProduct = {
  slug: "",
  name: "",
  name_marathi: "",
  price: 0,
  original_price: 0,
  image_url: "",
  category: "Skin Care",
  description: "",
  description_marathi: "",
  benefits: [] as string[],
  benefits_marathi: [] as string[],
  usps: [] as string[],
  weight: "",
  in_stock: true,
  is_best_seller: false,
  rating: 0,
  reviews_count: 0,
  sort_order: 0,
};

const AdminDashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Partial<Product> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { signOut, user } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async () => {
    if (!editProduct?.name || !editProduct?.slug || !editProduct?.price) {
      toast({ title: "Missing fields", description: "Name, slug, and price are required.", variant: "destructive" });
      return;
    }
    setSaving(true);

    try {
      if (editProduct.id) {
        // Update
        const { id, created_at, updated_at, ...updateData } = editProduct as Product;
        const { error } = await supabase.from("products").update(updateData).eq("id", id);
        if (error) throw error;
        toast({ title: "Product updated!" });
      } else {
        // Insert
        const { error } = await supabase.from("products").insert({
          slug: editProduct.slug!,
          name: editProduct.name!,
          name_marathi: editProduct.name_marathi || null,
          price: editProduct.price!,
          original_price: editProduct.original_price || null,
          image_url: editProduct.image_url || null,
          category: editProduct.category || "Skin Care",
          description: editProduct.description || null,
          description_marathi: editProduct.description_marathi || null,
          benefits: editProduct.benefits || [],
          benefits_marathi: editProduct.benefits_marathi || [],
          usps: editProduct.usps || [],
          weight: editProduct.weight || null,
          in_stock: editProduct.in_stock ?? true,
          is_best_seller: editProduct.is_best_seller ?? false,
          rating: editProduct.rating || 0,
          reviews_count: editProduct.reviews_count || 0,
          sort_order: editProduct.sort_order || 0,
        });
        if (error) throw error;
        toast({ title: "Product created!" });
      }
      setIsDialogOpen(false);
      setEditProduct(null);
      fetchProducts();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Product deleted" });
      fetchProducts();
    }
  };

  const toggleBestSeller = async (id: string, current: boolean | null) => {
    const { error } = await supabase.from("products").update({ is_best_seller: !current }).eq("id", id);
    if (!error) fetchProducts();
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin");
  };

  const bestSellers = products.filter((p) => p.is_best_seller);

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Go Arpita Admin</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{products.length}</p>
                <p className="text-sm text-muted-foreground">Total Products</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{bestSellers.length}</p>
                <p className="text-sm text-muted-foreground">Best Sellers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {products.filter((p) => p.in_stock).length}
                </p>
                <p className="text-sm text-muted-foreground">In Stock</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Products</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setEditProduct({ ...emptyProduct })}
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editProduct?.id ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>
                {editProduct && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label>Name *</Label>
                      <Input value={editProduct.name || ""} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug *</Label>
                      <Input value={editProduct.slug || ""} onChange={(e) => setEditProduct({ ...editProduct, slug: e.target.value })} placeholder="e.g. panchagavya-soap" />
                    </div>
                    <div className="space-y-2">
                      <Label>Name (Marathi)</Label>
                      <Input value={editProduct.name_marathi || ""} onChange={(e) => setEditProduct({ ...editProduct, name_marathi: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={editProduct.category || "Skin Care"} onValueChange={(v) => setEditProduct({ ...editProduct, category: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Skin Care">Skin Care</SelectItem>
                          <SelectItem value="Ayurvedic Treatments">Ayurvedic Treatments</SelectItem>
                          <SelectItem value="Natural Products">Natural Products</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Price (₹) *</Label>
                      <Input type="number" value={editProduct.price || ""} onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Original Price (₹)</Label>
                      <Input type="number" value={editProduct.original_price || ""} onChange={(e) => setEditProduct({ ...editProduct, original_price: Number(e.target.value) })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Image URL</Label>
                      <Input value={editProduct.image_url || ""} onChange={(e) => setEditProduct({ ...editProduct, image_url: e.target.value })} placeholder="https://..." />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea value={editProduct.description || ""} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} rows={3} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description (Marathi)</Label>
                      <Textarea value={editProduct.description_marathi || ""} onChange={(e) => setEditProduct({ ...editProduct, description_marathi: e.target.value })} rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label>Weight</Label>
                      <Input value={editProduct.weight || ""} onChange={(e) => setEditProduct({ ...editProduct, weight: e.target.value })} placeholder="e.g. 100g" />
                    </div>
                    <div className="space-y-2">
                      <Label>Sort Order</Label>
                      <Input type="number" value={editProduct.sort_order || 0} onChange={(e) => setEditProduct({ ...editProduct, sort_order: Number(e.target.value) })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Benefits (comma separated)</Label>
                      <Input
                        value={(editProduct.benefits || []).join(", ")}
                        onChange={(e) => setEditProduct({ ...editProduct, benefits: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>USPs (comma separated)</Label>
                      <Input
                        value={(editProduct.usps || []).join(", ")}
                        onChange={(e) => setEditProduct({ ...editProduct, usps: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                      />
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Switch checked={editProduct.in_stock ?? true} onCheckedChange={(v) => setEditProduct({ ...editProduct, in_stock: v })} />
                        <Label>In Stock</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={editProduct.is_best_seller ?? false} onCheckedChange={(v) => setEditProduct({ ...editProduct, is_best_seller: v })} />
                        <Label>Best Seller</Label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Button onClick={handleSave} disabled={saving} className="w-full">
                        {saving ? "Saving..." : editProduct.id ? "Update Product" : "Create Product"}
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-center py-12 text-muted-foreground">No products yet. Add your first product!</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Best Seller</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {product.image_url && (
                              <img src={product.image_url} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            )}
                            <div>
                              <p className="font-medium text-foreground">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.slug}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{product.category}</TableCell>
                        <TableCell>
                          <span className="font-semibold text-foreground">₹{product.price}</span>
                          {product.original_price && (
                            <span className="ml-2 text-xs line-through text-muted-foreground">₹{product.original_price}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-full ${product.in_stock ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                            {product.in_stock ? "In Stock" : "Out"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={!!product.is_best_seller}
                            onCheckedChange={() => toggleBestSeller(product.id, product.is_best_seller)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditProduct(product);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDelete(product.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Best Sellers Section */}
        {bestSellers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" /> Best Sellers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {bestSellers.map((p) => (
                  <div key={p.id} className="border border-border rounded-xl p-4 bg-card">
                    {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-32 object-cover rounded-lg mb-3" />}
                    <h3 className="font-semibold text-foreground">{p.name}</h3>
                    <p className="text-primary font-bold mt-1">₹{p.price}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
